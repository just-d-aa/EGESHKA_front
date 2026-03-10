interface Window {
  google: {
    accounts: {
      id: {
        initialize(config: {
          client_id: string;
          callback: (response: { credential: string }) => void;
          auto_select?: boolean;
          itp_support?: boolean;
        }): void;
        prompt(momentListener?: (notification: {
          isNotDisplayed(): boolean;
          isSkippedMoment(): boolean;
          getNotDisplayedReason(): string;
          getSkippedReason(): string;
        }) => void): void;
      };
    };
  };
}
