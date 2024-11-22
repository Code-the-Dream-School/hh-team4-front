const FormRow = ({ type, name, labelText, defaultValue, placeHolder }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                className="form-input"
                defaultValue={defaultValue || ''}
                required
                placeholder={placeHolder}
            />
        </div>
    );
};
export default FormRow;
