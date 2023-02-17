import * as React from 'react';
import InstagramModal from '../InstagramModal';
import ListReasons from './ListReasons';
import ReportForm from './ReportForm';
import SuccessfulReport from './SuccessfulReport';

const contents = [
    'listReasons',
    'reportUser',
    'otherReason',
    'successful'
]

const ReportUser = ({ open, handleClose, item }) => {
    const [content, setContent] = React.useState(contents[0])
    const [selectedItem, setSelectedItem] = React.useState(null)

    const toggleModal = () => {
        setContent(contents[0])
        handleClose()
    }

    const nextStep = content => setContent(content)

    if (!open) return null;

    return (
        <InstagramModal
            handleClose={toggleModal}
            open={open}
        >
            {content == 'listReasons' ? (
                <ListReasons
                    item={item}
                    toggleNextStep={nextStep}
                    setSelectedItem={item => setSelectedItem(item)}
                />
            ) : (content == 'reportUser') ? (
                <ReportForm
                    item={item}
                    cancel={toggleModal}
                    selectedItem={selectedItem}
                    toggleNextStep={nextStep}
                />
            ) : <SuccessfulReport item={item} handleClose={toggleModal} />}
        </InstagramModal>
    );
}

export default ReportUser
