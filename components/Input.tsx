import styles from "@components/Input.module.scss";

import * as React from "react";
import * as U from "@common/utilities";

export default class Input extends React.Component<any> {
  _unit;
  _input;

  componentDidMount = () => {
    if (this.props.unit) {
      this._input.style.paddingRight = `${this._unit.offsetWidth + 48}px`;
    }

    if (this.props.autoFocus) {
      this._input.focus();
    }
  };

  _handleCopy = (e) => {
    this._input.select();
    document.execCommand("copy");
  };

  _handleKeyUp = (e) => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }

    if ((e.which === 13 || e.keyCode === 13) && this.props.onSubmit) {
      this.props.onSubmit(e);
      return;
    }
  };

  _handleChange = (e) => {
    if (!U.isEmpty(this.props.pattern) && !U.isEmpty(e.target.value)) {
      const TestRegex = new RegExp(this.props.pattern);
      if (!TestRegex.test(e.target.value)) {
        e.preventDefault();
        return;
      }
    }

    if (e.target.value && e.target.value.length > this.props.max) {
      e.preventDefault();
      return;
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    return (
      <div className={styles.container} style={this.props.style}>
        <div style={{ position: "relative" }}>
          <input
            className={styles.input}
            ref={(c) => {
              this._input = c;
            }}
            autoComplete="off"
            autoFocus={this.props.autoFocus}
            value={this.props.value}
            name={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            onChange={this._handleChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onKeyUp={this._handleKeyUp}
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
            style={{
              paddingRight: this.props.copyable ? "32px" : "24px",
              ...this.props.inputStyle,
            }}
          />
          <div
            className={styles.unit}
            ref={(c) => {
              this._unit = c;
            }}
          >
            {this.props.unit}
          </div>
          {this.props.suggestions && this.props.suggestions.length ? (
            <div className={styles.options}>
              {this.props.suggestions.map((each) => (
                <div className={styles.item} key={`${each.text}-${each.value}`}>
                  <div className={styles.left}>{each.text}</div>
                  <div
                    className={styles.right}
                    onClick={() => this.props.onSelectText({ value: each.value })}
                  >
                    Pick
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
