import SettingsLayout from "../../layouts/SettingsLayout";
import MyAdCard from "./MyAds/MyAdCard";

const ShowAd = ({ location }) => {
    const { state } = location;

    return (
        <SettingsLayout title='Mi anuncio'>
            <MyAdCard {...state} fullWidth />
        </SettingsLayout>
    )
}

export default ShowAd;
