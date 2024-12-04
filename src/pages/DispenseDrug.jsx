import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import { MdOutlineQrCodeScanner } from 'react-icons/md';

const DispenseDrug = () => {
    return (
        <Wrapper>
            <form className="form">
                <Logo />
                <h4>Dispense Drug</h4>
                <FormRow
                    type="text"
                    name="name"
                    labelText="name"
                    defaultValue="ALBUTEROL"
                    placeholder="NAME"
                />
                <FormRow
                    type="number"
                    name="quantity"
                    labelText="quantity"
                    defaultValue="100"
                    placeholder="DRUG QUANTITY"
                />
                <FormRow
                    type="text"
                    name="lot #"
                    labelText="lot #"
                    defaultValue="123"
                    placeholder="LOT NUMBER"
                />
                <FormRow
                    type="text"
                    name="ndc #"
                    labelText="ndc #"
                    defaultValue="123456"
                    placeholder="NDC NUMBER"
                />
                <FormRow
                    type="text"
                    name="dispense date"
                    labelText="dispense date"
                    defaultValue="12/25/2024"
                    placeholder="DISPENSE DATE"
                />
                <button type="submit" className="btn btn-block">
                    Dispense Medication
                </button>
                <button className="btn btn-block secondary">
                    <MdOutlineQrCodeScanner className="scan-icon" />
                    Scan Medication
                </button>
            </form>
        </Wrapper>
    );
};

export default DispenseDrug;

const Wrapper = styled.section`
    min-height: 100vh;
    display: grid;
    align-items: center;
    .logo {
        display: block;
        margin: 0 auto;
        margin-bottom: 1.38rem;
    }
    .form {
        max-width: 400px;
        border-top: 5px solid var(--color-blue-dark);
    }
    .form-label {
        text-transform: lowercase;
    }
    .form-input {
        background-color: var(--grey-50);
        text-transform: uppercase;
    }
    h4 {
        text-align: center;
        margin-bottom: 1.38rem;
    }
    p {
        margin-top: 1rem;
        text-align: center;
        line-height: 1.5;
    }
    .btn {
        margin-top: 1rem;
    }
    .member-btn {
        color: var(--primary-500);
        letter-spacing: var(--letter-spacing);
        margin-left: 0.25rem;
    }
    .secondary {
        background-color: var(--color-green-med);
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.6rem;
        padding-bottom: 0.6rem;
    }
    .scan-icon {
        padding-right: 10px;
        font-size: 2rem;
    }
`;
