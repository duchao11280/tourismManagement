import React , {useContext}from 'react'
import { useAccordionButton} from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';
import{BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
const ContextAwareToggle = ({ children, eventKey, callback }) => {

    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <button
            className="btn"
            style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
            onClick={decoratedOnClick}
        >
            {isCurrentEventKey?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>}
        </button>
    );

}

export default ContextAwareToggle
