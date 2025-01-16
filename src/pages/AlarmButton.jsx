import { useNavigate } from 'react-router-dom';
import styles from './AlarmButton.module.css';
import styled from 'styled-components';
export default function AlarmButton({
    message,
    imagepath,
    filterTitle,
    alarmFilterData,
    targetPage,
}) {
    const Navigate = useNavigate();

    function loadingPage() {
        Navigate(`/${targetPage}`, { state: { alarmFilterData, filterTitle } });
    }

    return (
        <Wrapper className={styles.alarmitem}>
            <img
                src={imagepath}
                alt={filterTitle}
                className={styles.alarmicon}
                onClick={loadingPage}
            />
            <p className="text" onClick={loadingPage}>
                {message}
            </p>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    .text {
        font-size: 1.5rem;
        color: var(--color-blue-dark);
    }
`;
