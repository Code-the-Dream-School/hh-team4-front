import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import { GoPencil } from 'react-icons/go';

const Store = () => {
    return (
        <Wrapper>
            <form className="form">
                <Logo />
                <h4>Store Info</h4>
                <FormRow
                    type="text"
                    name="storeName"
                    labelText="store name"
                    defaultValue="WALGREENS"
                    placeholder="STORE NAME"
                />
                <FormRow
                    type="text"
                    name="address"
                    labelText="address"
                    defaultValue="122 Harris Drive, Durham, NC 27519"
                    placeholder="STORE ADDRESS"
                />
                <button type="submit" className="btn btn-block">
                    Dispense Medication
                </button>
                <button className="btn btn-block secondary">
                    <GoPencil className="scan-icon" />
                    Edit Store
                </button>
            </form>
        </Wrapper>
    );
};

export default Store;

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
        font-size: 1.5rem;
    }
`;
