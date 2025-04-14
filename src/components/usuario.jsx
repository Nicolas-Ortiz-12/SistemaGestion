import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <label className="popup">
        <input type="checkbox" />
        <div tabIndex={0} className="burger">
          <svg
            viewBox="0 0 24 24"
            fill="#1e4e79"         
            height={20}
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z" />
          </svg>
        </div>
        <nav className="popup-window">
          <ul>
            <li>
              <button>
                <svg
                  width={30}
                  height={30}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.598 9h-1.055c1.482-4.638 5.83-8 10.957-8 6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5c-5.127 0-9.475-3.362-10.957-8h1.055c1.443 4.076 5.334 7 9.902 7 5.795 0 10.5-4.705 10.5-10.5s-4.705-10.5-10.5-10.5c-4.568 0-8.459 2.923-9.902 7zm12.228 3l-4.604-3.747.666-.753 6.112 5-6.101 5-.679-.737 4.608-3.763h-14.828v-1h14.826z" />
                </svg>
                <span>Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .popup {
    /* Sólo estos tres valores cambiaron: */
    --burger-bg: #F2EFE7;           /* fondo del botón */
    --nav-bg: #F2EFE7;              /* fondo del popup */
    --nav-button-hover-bg: #9AD0C2; /* hover de las opciones */

    /* resto de variables intactas */
    --burger-line-width: 1.125em;
    --burger-line-height: 0.125em;
    --burger-offset: 0.625em;
    --burger-color: #333;
    --burger-line-border-radius: 0.1875em;
    --burger-diameter: 3.125em;
    --burger-btn-border-radius: calc(var(--burger-diameter) / 2);
    --burger-line-transition: 0.3s;
    --burger-transition: all 0.1s ease-in-out;
    --burger-hover-scale: 1.1;
    --burger-active-scale: 0.95;
    --burger-enable-outline-color: var(--burger-bg);
    --burger-enable-outline-width: 0.125em;
    --burger-enable-outline-offset: var(--burger-enable-outline-width);

    --nav-padding-x: 0.25em;
    --nav-padding-y: 0.625em;
    --nav-border-radius: 0.375em;
    --nav-border-color: #ccc;
    --nav-border-width: 0.0625em;
    --nav-shadow-color: rgba(0, 0, 0, 0.2);
    --nav-shadow-width: 0 1px 5px;
    --nav-font-family: "Poppins", sans-serif;
    --nav-default-scale: 0.8;
    --nav-active-scale: 1;
    --nav-position-left: 50%;
    --nav-position-right: unset;

    --nav-title-size: 0.625em;
    --nav-title-color: #777;
    --nav-title-padding-x: 1rem;
    --nav-title-padding-y: 0.25em;

    --nav-button-padding-x: 1rem;
    --nav-button-padding-y: 0.375em;
    --nav-button-border-radius: 0.375em;
    --nav-button-font-size: 16px;
    --nav-button-hover-text-color: #fff;
    --nav-button-distance: 0.875em;

    --underline-border-width: 0.0625em;
    --underline-border-color: #ccc;
    --underline-margin-y: 0.3125em;
  }

  .popup {
    display: inline-block;
    position: relative;
  }

  .popup input {
    display: none;
  }

  .burger {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--burger-bg);
    width: var(--burger-diameter);
    height: var(--burger-diameter);
    border-radius: var(--burger-btn-border-radius);
    border: none;
    cursor: pointer;
    overflow: hidden;
    transition: var(--burger-transition);
    outline: var(--burger-enable-outline-width) solid transparent;
    outline-offset: 0;
  }

  .popup-window {
    transform: translateX(-50%) scale(var(--nav-default-scale));
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: calc(
      var(--burger-diameter) + var(--burger-enable-outline-width) +
        var(--burger-enable-outline-offset)
    );
    left: var(--nav-position-left);
    right: var(--nav-position-right);
    margin-top: 10px;
    padding: var(--nav-padding-y) var(--nav-padding-x);
    background: var(--nav-bg);
    font-family: var(--nav-font-family);
    border-radius: var(--nav-border-radius);
    border: var(--nav-border-width) solid var(--nav-border-color);
    box-shadow: var(--nav-shadow-width) var(--nav-shadow-color);
    transition: var(--burger-transition);
  }

  .popup-window ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .popup-window ul button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: var(--nav-button-padding-y) var(--nav-button-padding-x);
    font-size: var(--nav-button-font-size);
    border: none;
    background: none;
    cursor: pointer;
    column-gap: var(--nav-button-distance);
    outline: none;
  }

  .popup-window ul button:hover,
  .popup-window ul button:focus-visible {
    background: var(--nav-button-hover-bg);
    border-radius: 4px;
  }

  .burger:hover {
    transform: scale(var(--burger-hover-scale));
  }

  .burger:active {
    transform: scale(var(--burger-active-scale));
  }

  .burger:focus:not(:hover) {
    outline-color: var(--burger-enable-outline-color);
    outline-offset: var(--burger-enable-outline-offset);
  }

  .popup input:checked ~ .popup-window {
    transform: translateX(-50%) scale(var(--nav-active-scale));
    visibility: visible;
    opacity: 1;
  }
`;

export default Button;
