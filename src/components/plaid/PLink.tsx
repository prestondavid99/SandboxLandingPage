import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";
import { supabase } from '@/lib/supabaseClient';

type PLinkState = {
  linkToken: string;
};

class PLink extends Component<{}, PLinkState> {
  constructor(props: any) {
    super(props);

    this.state = {
      linkToken: "",
    };
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
    axios.post("/api/plaid/callback", {
      public_token: public_token
    });
  }

  handleOnExit() {
    // handle the case when your user exits PlaidLink
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
      </div>
    );
  }
}

export default PLink;
