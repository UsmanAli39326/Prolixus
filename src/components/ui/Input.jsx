"use client"
import React, { forwardRef } from "react";

const Input = forwardRef(
    (
        {
            id,
            name,
            label,
            type = "text",
            value,
            defaultValue,
            onChange,
            placeholder,
            className = "",
            inputClassName = "",
            labelClassName = "",
            disabled = false,
            required = false,
            error,
            icon, // React node shown inside the input (left)
            rightIcon, // React node shown inside the input (right)
            ...rest
        },
        ref
    ) => {
        const inputId = id || name;

        return (
            <div className={`input-field ${className}`}>
                {label && (
                    <label htmlFor={inputId} className={`input-label ${labelClassName}`}>
                        {label}
                        {required ? " *" : null}
                    </label>
                )}

                <div
                    className={`flex justify-center items-center input-wrapper ${error ? "input-error" : ""} ${disabled ? "input-disabled" : ""
                        }`}
                >
                    {icon && <span className="input-icon left ">{icon}</span>}

                    <input
                        id={inputId}
                        name={name}
                        ref={ref}
                        type={type}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        className={`input-element ${inputClassName}`}
                        required={required}
                        {...rest}
                    />

                    {rightIcon && <span className="input-icon right">{rightIcon}</span>}
                </div>

                {error && (
                    <p id={`${inputId}-error`} className="input-error-text" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

export default Input;