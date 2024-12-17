import { useNavigate } from 'react-router-dom';
import styles from './AlarmButton.module.css';

export default function AlarmButton({ message, imagepath, filterTitle, alarmFilterData, targetPage }) {
    const Navigate = useNavigate();

    function loadingPage() {
        console.log("filterData");
        console.log(alarmFilterData);
        Navigate(`/${targetPage}`, { state: { alarmFilterData } });
    }

    return (
        <div className={styles.alarmitem}>
            <img
                src={imagepath}
                alt={filterTitle}
                className={styles.alarmicon}
                onClick={loadingPage}
            />
            <span className={styles.alarmtext} onClick={loadingPage}>
                {message}
            </span>
        </div>
    );
}
