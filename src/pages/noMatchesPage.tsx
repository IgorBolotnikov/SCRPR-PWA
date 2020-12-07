import React from 'react';

export default function NoMatchesPage(): React.ReactElement {
  return (
    <div className="message_404_container">
      <div className="window">
        <h1 className="message_404">404</h1>
        <h3 className="page_not_found">Ooops...</h3>
        <h3 className="page_not_found">Page not found :(</h3>
      </div>
    </div>
  );
}
