/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchArgs, FetchBaseQueryArgs } from "@reduxjs/toolkit/query";
import TokenManager from "./tokenManager";

interface QueryConfigurationProps {
  callwithUserData?: boolean;
  url: string;
  baseUrl?: string;
  method?: string;
  body?: any;
  params?: any;
}

export const queryConfiguration = (
  props: QueryConfigurationProps
): FetchArgs => {
  const {
    callwithUserData = false,
    url,
    baseUrl,
    method,
    body,
    ...extraProps
  } = props;

  const configuredObj: FetchArgs = { url: url };

  if (callwithUserData) {
    const token = TokenManager.getAccessToken();
    configuredObj.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  if (baseUrl) {
    configuredObj.url = baseUrl + configuredObj.url;
  }

  if (method) {
    configuredObj.method = method;
  }

  if (body) {
    configuredObj.body = body;
  }

  return { ...configuredObj, ...extraProps };
};

interface CreateApiConfigurationProps {
  callwithUserData?: boolean;
  backendDomain?: string;
}

export const createApiConfiguration = (
  props: CreateApiConfigurationProps = {}
) => {
  const {
    callwithUserData = false,
    backendDomain = process.env.NEXT_PUBLIC_DJANGO_API_URL,
  } = props;

  const configuredObj: FetchBaseQueryArgs = {
    baseUrl: backendDomain,
  };

  if (callwithUserData) {
    configuredObj.prepareHeaders = (headers: Headers) => {
      const token = TokenManager.getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    };
  }

  return configuredObj;
};
