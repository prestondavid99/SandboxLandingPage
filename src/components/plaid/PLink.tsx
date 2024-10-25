import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";
import { getEnvVars } from "@/lib/env";
import { supabase } from '@/lib/supabaseClient';

const { plaidEnvironment } = getEnvVars();

type PLinkState = {
  transactions: any[];
  linkToken: string;
};

class PLink extends Component<{}, PLinkState> {
  constructor(props: any) {
    super(props);

    this.state = {
      transactions: [],
      linkToken: "", // To store the link_token
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    // Fetch link_token from your backend when the component mounts
    try {
      // Get the current user's session from Supabase
      const { data: { session } } = await supabase.auth.getSession();

      // Fetch link_token from your backend, passing the Supabase token in headers
      const response = await axios.post("/api/plaid/connect", {}, {
        headers: {
          "Authorization": `Bearer ${session?.access_token}` // Use the access token
        }
      });
      this.setState({ linkToken: response.data.link_token });
    } catch (error) {
      console.error("Error fetching link token:", error);
    }
  }

  handleOnSuccess(public_token: any, metadata: any) {
    axios.post("/auth/public_token", {
      public_token: public_token
    });
  }

  handleOnExit() {
    // handle the case when your user exits Link
  }

  handleClick(res: any) {
    axios.get("/transactions").then(res => {
      this.setState({ transactions: res.data });
    });
  }

  render() {
    return (
      <div>
        {this.state.linkToken ? (
          <PlaidLink
            token={this.state.linkToken} // Use linkToken instead of publicKey
            onSuccess={this.handleOnSuccess}
            onExit={this.handleOnExit}
            className="test"
          >
            Connect your bank!
          </PlaidLink>
        ) : (
          <p>Loading...</p>
        )}
        {/* <div>
          <button onClick={this.handleClick}>Get Transactions</button>
        </div> */}
      </div>
    );
  }
}

export default PLink;
