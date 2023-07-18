import React from "react";
import { Routes, Route, Link, HashRouter } from "react-router-dom";

const UserContext = React.createContext(null);
const apiUrl = `http://localhost:8080`;

const classes = (bgcolor, txtcolor) => {
  const bg = bgcolor ? " bg-" + bgcolor : " ";
  const txt = txtcolor ? " text-" + txtcolor : " text-white";
  return "card mb-3 " + bg + txt;
};

const BankForm = ({
  bgcolor,
  txtcolor,
  header,
  title,
  status,
  inputFields,
  handleSubmit,
  submitButtonText,
  displayForm,
  successString,
  refreshActionString,
  handleRefreshAction,
}) => {
  const inputBody = (fields) => {
    const items = fields.map((item, index) => {
      return (
        <div key={index}>
          <label htmlFor={item.id} className="form-label">
            {item.label}
          </label>
          <input
            type={item.type}
            className="form-control"
            id={item.id}
            onChange={(e) => item.handleOnChange(e)}
          />
        </div>
      );
    });

    return items;
  };

  const successBody = (successString, actionString, handleAction) => {
    return (
      <>
        <h5>{successString}</h5>
        {actionString && (
          <button
            type="submit"
            className="btn btn-light"
            onClick={handleAction}
          >
            {actionString}
          </button>
        )}
      </>
    );
  };

  return (
    <div className={classes(bgcolor, txtcolor)} style={{ maxWidth: "18rem" }}>
      <div className="card-header">{header}</div>
      <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        <form>
          <div className="mb-3">
            {displayForm
              ? inputBody(inputFields)
              : successBody(
                  successString,
                  refreshActionString,
                  handleRefreshAction
                )}
          </div>
          {displayForm && (
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleSubmit}
            >
              {submitButtonText}
            </button>
          )}
        </form>
        {status && <div id="create_status">{status}</div>}
      </div>
    </div>
  );
};

const BankCard = ({
  bgcolor,
  txtcolor,
  width,
  header,
  title,
  data,
  text,
  img,
}) => {
  const dataList = (data) => {
    return (
      <ul className="list-group">
        {data.map((elem, idx) => {
          return (
            <li key={idx} className="list-group-item">
              {Object.entries(elem).map(([key, value]) => {
                return (
                  key != "__v" && (
                    <p>
                      <b>{key == "balance" ? `${key} (USD)` : key}</b>:{" "}
                      {value || "N/A"}
                    </p>
                  )
                );
              })}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className={classes(bgcolor, txtcolor)}
      style={{ maxWidth: `${width}rem` }}
    >
      <div className="card-header">{header}</div>
      <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        {text && <p className="card-text">{text}</p>}
        {data && Object.keys(data).length !== 0 && dataList(data)}
        {img && (
          <img
            src={require(`./${img}`)}
            className="img-fluid"
            alt="Responsive"
          />
        )}
      </div>
    </div>
  );
};

export {
  Routes,
  BankCard,
  BankForm,
  Route,
  Link,
  HashRouter,
  UserContext,
  apiUrl,
};
