import { initializeConnector } from "@web3-react/core";
import type { Actions } from "@web3-react/types";
import { Connector } from "@web3-react/types";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";

class Web3AuthConnector extends Connector {
  private readonly web3auth: Web3Auth;

  constructor(actions: Actions) {
    super(actions);

    const web3AuthCtorParams = {
      clientId:
        "BArchlDSjFI4ScXBFTgN8h_i_zia0bf20CcP3GyPq5ILiwQ2pm4PJAseIqVCM2Co7MXjhMMrkGXxXcyJ95XjNUw",
      chainConfig: { chainNamespace: CHAIN_NAMESPACES.EIP155, chainId: "0x1" },
    };

    this.web3auth = new Web3Auth(web3AuthCtorParams);
  }

  public async activate(): Promise<void> {
    await this.web3auth.initModal({});
  }
}

export const [web3auth, hooks] = initializeConnector<Web3AuthConnector>(
  (actions) => new Web3AuthConnector(actions),
  [1]
);
