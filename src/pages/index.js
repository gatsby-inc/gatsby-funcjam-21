import React from "react";

const IndexPage = () => {
  return (
    <main>
      <form action="api/auth" style={{ display: `block`, width: 400 }}>
        <fieldset>
          <p>
            The solution to all your problems are here! Buy access to my life
            changing private repository on Github. I promise, it's a bargain!
          </p>

          <small>
            <ul>
              <li>Step 1. Authenticate with GitHub</li>
              <li>Step 2. Pay with Stripe</li>
              <li>Step 3. Wait for invite</li>
            </ul>
          </small>

          <button>Yes, please!</button>
        </fieldset>
      </form>
    </main>
  );
};

export default IndexPage;
