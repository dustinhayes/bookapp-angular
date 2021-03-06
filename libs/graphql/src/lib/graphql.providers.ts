import { HttpHeaders } from '@angular/common/http';
import { InjectionToken } from '@angular/core';

import {
  AUTH_TOKEN,
  environment,
  StoragePlatformService
} from '@bookapp-angular/core';

import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

export const WebSocketImpl = new InjectionToken('WebSocketImpl');

interface Definintion {
  kind: string;
  operation?: string;
}

const defaultOptions = {
  watchQuery: {
    errorPolicy: 'all'
  },
  query: {
    errorPolicy: 'all'
  },
  mutate: {
    errorPolicy: 'all'
  }
};

export function createApolloFactory(
  httpLink: HttpLink,
  storageService: StoragePlatformService,
  webSocketImpl: any
) {
  const http = httpLink.create({
    uri: environment.endpointUrl
  });

  const ws = new WebSocketLink({
    uri: environment.subscriptionsEndpoint,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: storageService.getItem(AUTH_TOKEN)
      }
    },
    webSocketImpl
  });

  const auth = setContext(() => {
    const token = storageService.getItem(AUTH_TOKEN);
    if (!token) {
      return {};
    } else {
      return {
        headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
      };
    }
  });

  const link = split(
    ({ query }) => {
      const { kind, operation }: Definintion = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    auth.concat(http)
  );

  const errorLink = onError(({ networkError }) => {
    // TODO add handler to show snackbar
    if (networkError) {
      console.log(`[Network error]`, networkError);
    }
  });

  return {
    link: errorLink.concat(link),
    cache: new InMemoryCache(),
    defaultOptions
  };
}
