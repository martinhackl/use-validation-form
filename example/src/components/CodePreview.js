import React from 'react';
import PropTypes from 'prop-types';

function CodePreview({ renderInput, title, code, value, error }) {
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
            <div className="notification">Error: {String(error)}</div>
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

CodePreview.propTypes = {
  renderInput: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
  ]),
  error: PropTypes.string,
};

export default CodePreview;
