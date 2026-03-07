interface Window {
  AppleID: {
    auth: {
      init(config: {
        clientId: string;
        scope: string;
        redirectURI: string;
        usePopup: boolean;
      }): void;
      signIn(): Promise<{
        authorization: { id_token: string; code: string };
      }>;
    };
  };
}
