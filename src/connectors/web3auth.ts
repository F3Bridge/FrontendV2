import { initializeConnector } from "@web3-react/core";
import type {
  Actions,
  AddEthereumChainParameter,
  Provider,
} from "@web3-react/types";
import { Connector } from "@web3-react/types";
import { Web3Auth as Web3AuthClient } from "@web3auth/web3auth";

export class Web3Auth extends Connector {
  declare provider: Provider | undefined;
  private readonly options: unknown;
  private eagerConnection?: boolean;
  private web3auth: Web3AuthClient;

  constructor(actions: Actions, options: unknown, connectEagerly?: boolean) {
    super(actions);
    this.options = options;
    this.eagerConnection = connectEagerly;

    this.web3auth = new Web3AuthClient({
      clientId:
        "BArchlDSjFI4ScXBFTgN8h_i_zia0bf20CcP3GyPq5ILiwQ2pm4PJAseIqVCM2Co7MXjhMMrkGXxXcyJ95XjNUw",
      chainConfig: { chainNamespace: "eip155" },
    });
    this.web3auth.initModal();
  }

  private get connected() {
    return false;
  }

  private isomorphicInitialize() {}

  async connectEagerly(): Promise<void> {}

  async activate(
    desiredChainIdOrChainParameters?: number | AddEthereumChainParameter
  ): Promise<void> {
    await this.web3auth.connect();
  }
  /** {@inheritdoc Connector.deactivate} */
  deactivate(): void {}
}

export const [web3Auth, hooks] = initializeConnector<Web3Auth>(
  (actions) => new Web3Auth(actions, {})
);
