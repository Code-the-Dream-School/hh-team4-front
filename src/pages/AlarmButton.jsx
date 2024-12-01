import { useNavigate } from 'react-router-dom';
import styles from './AlarmButton.module.css' ;

export default function AlarmButton({message, imagepath , filterTitle , filterData , targetPage }){

    const Navigate=useNavigate() ;

    function loadingPage(){
       console.log(filterData) ;
       Navigate(`/${targetPage}`, { state: { filterTitle, filterData } });
  
}

return (
    <div className={styles.alarmitem}>
        <img src={imagepath} alt={filterTitle} className={styles.alarmicon} onClick={loadingPage}/>
        <span className={styles.alarmtext} onClick={loadingPage}>    
            {message}
        </span>
    </div>

);
}