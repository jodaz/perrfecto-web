import * as React from 'react';
import { useChat } from '../../../context/ChatContext';
import InstagramModal from '../InstagramModal';
import ListReasons from './ListReasons';
import OtherReason from './OtherReason';
import ReportForm from './ReportForm';
import SuccessfulReport from './SuccessfulReport';

const contents = [
    'listReasons',
    'reportUser',
    'otherReason',
    'successful'
]

const ReportUser = ({ open, handleClose }) => {
    const { state: { receptor } } = useChat()
    const [content, setContent] = React.useState(contents[0])
    const [selectedItem, setSelectedItem] = React.useState(null)
    const [reason, setReason] = React.useState('')

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
                    receptor={receptor}
                    toggleNextStep={nextStep}
                    setSelectedItem={item => setSelectedItem(item)}
                />
            ) : (content == 'reportUser') ? (
                <ReportForm
                    receptor={receptor}
                    cancel={toggleModal}
                    selectedItem={selectedItem}
                    otherReason={reason}
                    toggleNextStep={nextStep}
                />
            ) : (content == 'successful') ? (
                <SuccessfulReport
                    receptor={receptor}
                    handleClose={toggleModal}
                />
            ) : (
                <OtherReason
                    receptor={receptor}
                    setReason={data => setReason(data)}
                    toggleNextStep={nextStep}
                />
            )}
        </InstagramModal>
    );
}

export default ReportUser
