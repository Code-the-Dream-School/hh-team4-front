import styled from 'styled-components';

const Alerts = () => {
    return (
        <Wrapper>
            <div className="alert-container">
                <div className="alert1"></div>
                <div className="alert2"></div>
                <div className="alert3"></div>
            </div>
        </Wrapper>
    );
};

export default Alerts;

const Wrapper = styled.section`
    .alert-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .alert1 {
        background-color: red;
        height: 70vh;
        width: 30vw;
    }
    .alert2 {
        background-color: orange;
        height: 70vh;
        width: 30vw;
    }
    .alert3 {
        background-color: yellow;
        height: 70vh;
        width: 30vw;
    }
`;
