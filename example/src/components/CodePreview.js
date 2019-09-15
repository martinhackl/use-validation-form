import React from 'react';

function CodePreview({ renderInput, title, code, value }) {
  const trimmed = code.trim();

  return (
    <section className="section">
      <div className="columns">
        <div className="column is-12">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="columns">
        <div className="column is-4">
          <div className="field">
            <div className="control">{renderInput()}</div>
          </div>
        </div>
        <div className="column is-8">
          <div className="box">
            <div className="notification">Value: {JSON.stringify(value)}</div>
            <figure className="highlight">
              <pre>
                <code className="language-jsx">{trimmed}</code>
              </pre>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CodePreview;
