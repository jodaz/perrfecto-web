import * as React from 'react'
import {
    Route,
    Routes,
    useLocation
} from 'react-router-dom'
import { useAuth, guestUser } from './context/AuthContext';
// Layouts
import AppLayout from './layouts/App';
import LandingLayout from './layouts/LandingLayout';
// Pages
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from './components/Login';
import SignUp from './components/SignUp';
import RecoverPassword from './components/RecoverPassword';
import Intro from './pages/Intro';
import DetectLocation from './components/Modals/DetectLocation';
import Market from './pages/Market';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import ChatList from './pages/Chat/ChatList';
import ChatView from './pages/Chat/ChatView';
import NewPassword from './components/Modals/NewPassword';
import AskCode from './components/Modals/AskCode';
import Notifications from './pages/Notifications'
import CreateProfileWelcome from './components/CreateProfileWelcome';
import BusinessLanding from './pages/BusinessLanding';
import RegisterBusiness from './components/Modals/RegisterBusiness';
import Terms from './pages/Terms';
import PetProfile from './pages/Profile/PetProfile';
import PetOwner from './pages/Profile/PetOwner';
import Settings from './pages/Settings';
import Favourites from './pages/Favourites';
import Account from './pages/account';
import CreateAd from './pages/Ad/CreateAd';
import PersonalInformation from './pages/PersonalInformation';
import EditNames from './pages/PersonalInformation/EditNames';
import EditLocation from './pages/PersonalInformation/EditLocation';
import PetInformation from './pages/PetInformation';
import EditPetName from './pages/PetInformation/EditPetName';
import EditBreed from './pages/PetInformation/EditBreed';
import EditGender from './pages/PetInformation/EditGender';
import EditYearDate from './pages/PetInformation/EditYearDate';
import EditCharacteristics from './pages/PetInformation/EditCharacteristics';
import EditVaccines from './pages/PetInformation/EditVaccines';
import EditCertificates from './pages/PetInformation/EditCertificates';
import EditAd from './pages/Ad/EditAd';
import EditOwnerAge from './pages/PersonalInformation/EditOwnerAge';
import EditOwnerProfilePictures from './pages/Profile/EditOwnerProfilePictures';
import Businesses from './pages/Businesses';
import CreateBusiness from './pages/Businesses/CreateBusiness';
import EditBusiness from './pages/Businesses/EditBusiness';
import CreateBusinessStep1 from './pages/Businesses/CreateBusiness/CreateBusinessStep1';
import CreateBusinessStep2 from './pages/Businesses/CreateBusiness/CreateBusinessStep2';
import CreateBusinessStep3 from './pages/Businesses/CreateBusiness/CreateBusinessStep3';
import CreateBusinessStep4 from './pages/Businesses/CreateBusiness/CreateBusinessStep4';
import EditBusinessStep1 from './pages/Businesses/EditBusiness/EditBusinessStep1';
import EditBusinessStep2 from './pages/Businesses/EditBusiness/EditBusinessStep2';
import EditBusinessStep3 from './pages/Businesses/EditBusiness/EditBusinessStep3';
import EditBusinessStep4 from './pages/Businesses/EditBusiness/EditBusinessStep4';
import BlogCreate from './pages/Blog/BlogCreate';
import BusinessProfile from './pages/Profile/BusinessProfile';
import PublishedBlogsListing from './pages/Blog/PublishedBlogsListing';
import PublishedBlog from './pages/Blog/PublishedBlog';
import BlogEdit from './pages/Blog/BlogEdit';
import UpdatePassword from './pages/account/UpdatePassword';
import UpdateEmailAndPhone from './pages/account/UpdateEmailAndPhone';
import ShowAd from './pages/Ad/ShowAd';
import OnlyDesktop from './layouts/App/OnlyDesktop';
import PrivateRoute from './components/PrivateRoute';
import EditBusinessName from './pages/PersonalInformation/EditBusinessName';
import EditBusinessAddress from './pages/PersonalInformation/EditBusinessAddress';
import GuestProfile from './pages/Profile/GuestProfile';
import ShowMarket from './pages/Market/ShowMarket';
import ShowBusinessLocation from './pages/Businesses/ShowBusinessLocation';
import ShowBusiness from './pages/Businesses/ShowBusiness';
import Packs from './pages/packs';
import PackShow from './pages/packs/PackShow';
import Privacy from './pages/Settings/Privacy';
import Conditions from './pages/Settings/Conditions';
import BusinessSuscriptions from './components/Modals/BusinessSuscriptions';
import ShowCategory from './pages/Market/ShowCategory';

function AppRoutes() {
    let location = useLocation();
    const { state: { isAuth }, dispatch } = useAuth();

    // Set guest user by default
    React.useEffect(() => {
        if (!isAuth) {
            guestUser(dispatch)
        }
    }, [])

    return (
        <Routes>
            <Route
                path='/home'
                element={
                    <AppLayout>
                        <Home />
                    </AppLayout>
                }
            />
            <Route
                path='*'
                element={<NotFound />}
            />
            <Route
                path='/profile/settings/privacy'
                element={
                    <AppLayout>
                        <Privacy />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/terms'
                element={
                    <AppLayout>
                        <Conditions />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/packs'
                element={
                    <AppLayout>
                        <Packs />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/packs/:id'
                element={
                    <AppLayout>
                        <PackShow location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/market'
                element={
                    <AppLayout>
                        <Market />
                    </AppLayout>
                }
            />
            <Route
                path='/market/category/:id'
                element={
                    <AppLayout>
                        <ShowCategory location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/market/:id'
                element={
                    <AppLayout>
                        <ShowMarket />
                    </AppLayout>
                }
            />
            <Route
                path='/market/:id/location'
                element={
                    <AppLayout>
                        <ShowBusinessLocation location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/chat'
                element={
                    <AppLayout>
                        <ChatList />
                    </AppLayout>
                }
            />
            <Route
                path='/chat/:chatID'
                element={
                    <PrivateRoute authorize='user' unauthorized={<NotFound />}>
                        <AppLayout>
                            <ChatView />
                        </AppLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path='/blogs'
                element={
                    <AppLayout>
                        <Blog />
                    </AppLayout>
                }
            />
            <Route
                path='/blogs/:id'
                element={
                    <AppLayout>
                        <PublishedBlog />
                    </AppLayout>
                }
            />
            <Route
                path='/blogs/:id/edit'
                element={
                    <PrivateRoute authorize='user,business' unauthorized={<NotFound />}>
                        <AppLayout>
                            <BlogEdit />
                        </AppLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path='/blogs/me'
                element={
                    <PrivateRoute authorize='user,business' unauthorized={<NotFound />}>
                        <AppLayout>
                            <PublishedBlogsListing />
                        </AppLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path='/blogs/create'
                element={
                    <PrivateRoute authorize='user,business' unauthorized={<NotFound />}>
                        <AppLayout>
                            <BlogCreate />
                        </AppLayout>
                    </PrivateRoute>
                }
            />

            {/**
             * Publication routes
             */}
            <Route
                path='/profile/ads/create'
                element={
                    <PrivateRoute authorize='user' unauthorized={<NotFound />}>
                        <AppLayout>
                            <CreateAd location={location} />
                        </AppLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path='/profile/ads/:id/edit'
                element={
                    <PrivateRoute authorize='user' unauthorized={<NotFound />}>
                        <EditAd location={location} />
                    </PrivateRoute>
                }
            />
            <Route
                path='/profile/ads/show'
                element={
                    <PrivateRoute authorize='user' unauthorized={<NotFound />}>
                        <OnlyDesktop
                            aside={<PetProfile />}
                            principal={<ShowAd location={location} />}
                        />
                    </PrivateRoute>
                }
            />
            <Route
                path='/profile/settings/owner'
                element={
                    <AppLayout>
                        <PrivateRoute authorize='user,business' unauthorized={<NotFound />}>
                            <PersonalInformation location={location} />
                        </PrivateRoute>
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/owner/names'
                element={
                    <PrivateRoute authorize='user,business' unauthorized={<NotFound />}>
                        <AppLayout>
                            <EditNames location={location} />
                        </AppLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path='/profile/settings/owner/business-name'
                element={
                    <AppLayout>
                        <PrivateRoute authorize='business' unauthorized={<NotFound />}>
                            <EditBusinessName location={location} />
                        </PrivateRoute>
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/owner/business-address'
                element={
                    <AppLayout>
                        <PrivateRoute authorize='business' unauthorized={<NotFound />}>
                            <EditBusinessAddress location={location} />
                        </PrivateRoute>
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/owner/age'
                element={
                    <AppLayout>
                        <EditOwnerAge location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/owner/location'
                element={
                    <AppLayout>
                        <EditLocation />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet'
                element={
                    <AppLayout>
                        <PetInformation location={location} />
                    </AppLayout>
                }
            />

            <Route
                path='/profile/settings/pet/name'
                element={
                    <AppLayout>
                        <EditPetName location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/breed'
                element={
                    <AppLayout>
                        <EditBreed />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/gender'
                element={
                    <AppLayout>
                        <EditGender />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/age'
                element={
                    <AppLayout>
                        <EditYearDate />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/characteristics'
                element={
                    <AppLayout>
                        <EditCharacteristics />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/vaccines'
                element={
                    <AppLayout>
                        <EditVaccines />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/certificates'
                element={
                    <AppLayout>
                        <EditCertificates />
                    </AppLayout>
                }
            />

            {/**
             * Profile routes
             */}
            <Route
                path='/profile'
                element={
                    <AppLayout>
                        <Profile location={location}>
                            <PrivateRoute authorize="user">
                                <PetProfile />
                            </PrivateRoute>
                            <PrivateRoute authorize="business">
                                <BusinessProfile />
                            </PrivateRoute>
                            <PrivateRoute authorize="guest">
                                <GuestProfile />
                            </PrivateRoute>
                        </Profile>
                    </AppLayout>
                }
            />
            <Route
                path='/profile/owner'
                element={
                    <AppLayout>
                        <Profile location={location}>
                            <PetOwner />
                        </Profile>
                    </AppLayout>
                }
            />
            <Route
                path='/profile/owner/pictures'
                element={
                    <AppLayout>
                        <Profile location={location}>
                            <EditOwnerProfilePictures />
                        </Profile>
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings'
                element={
                    <AppLayout>
                        <Settings />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/account'
                element={
                    <AppLayout>
                        <Account location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/account/security'
                element={
                    <AppLayout>
                        <UpdatePassword />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/account/access'
                element={
                    <AppLayout>
                        <UpdateEmailAndPhone />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/favourites'
                element={
                    <AppLayout>
                        <Profile location={location}>
                            <Favourites title="Favoritos" />
                        </Profile>
                    </AppLayout>
                }
            />

            <Route
                path='/notifications'
                element={
                    <AppLayout>
                        <Notifications />
                    </AppLayout>
                }
            />

            <Route path="/" element={
                <LandingLayout>
                    <Landing location={location} />
                </LandingLayout>
            }>
                <Route path="/login" element={<Login location={location} />} />
                <Route path="/detect-location" element={<DetectLocation location={location} />} />
                <Route path="/register" element={<SignUp location={location} />} />
                <Route path="/recover-password" element={<RecoverPassword location={location} />} />
                <Route path="/recover-password/new" element={<NewPassword location={location} />} />
                <Route path="/recover-password/code" element={<AskCode location={location} />} />
            </Route>
            <Route path="/register/welcome" element={<CreateProfileWelcome location={location} />} />

            {/** Businesss routes */}
            <Route path="/business" element={
                <LandingLayout dark>
                    <BusinessLanding />
                </LandingLayout>
            }>
                <Route path="/business/register" element={<RegisterBusiness location={location} />} />
                <Route
                    path="/business/suscriptions"
                    element={<BusinessSuscriptions location={location} />}
                />
            </Route>

            <Route path="/businesses" element={
                <AppLayout>
                    <Businesses />
                </AppLayout>
            } />

            <Route path="/businesses/:id" element={
                <AppLayout>
                    <ShowBusiness />
                </AppLayout>
            } />

            <Route path="/businesses/:id/location" element={
                <AppLayout>
                    <ShowBusinessLocation location={location} />
                </AppLayout>
            } />
            <Route path="/businesses/create" element={
                <AppLayout>
                    <CreateBusiness />
                </AppLayout>
            }>
                <Route
                    path='/businesses/create'
                    element={
                        <AppLayout>
                            <CreateBusinessStep1 />
                        </AppLayout>
                    }
                />
                <Route
                    path='/businesses/create/step-2'
                    element={
                        <AppLayout>
                            <CreateBusinessStep2 />
                        </AppLayout>
                    }
                />
                <Route
                    path='/businesses/create/step-3'
                    element={
                        <AppLayout>
                            <CreateBusinessStep3 />
                        </AppLayout>
                    }
                />
                <Route
                    path='/businesses/create/step-4'
                    element={
                        <AppLayout>
                            <CreateBusinessStep4 />
                        </AppLayout>
                    }
                />
                <Route
                    path='/businesses/create/step-4/location'
                    element={
                        <AppLayout>
                            <ShowBusinessLocation location={location} />
                        </AppLayout>
                    }
                />
            </Route>
            <Route path="/businesses/edit" element={
                <AppLayout>
                    <EditBusiness />
                </AppLayout>
            }>
                <Route
                    path='/businesses/edit'
                    element={
                        <AppLayout>
                            <EditBusinessStep1 />
                        </AppLayout>
                    }
                />
                <Route
                    path='/businesses/edit/step-2'
                    element={
                        <AppLayout>
                            <EditBusinessStep2 />
                        </AppLayout>
                    }
                />
                <Route
                    path='/businesses/edit/step-3'
                    element={
                        <AppLayout>
                            <EditBusinessStep3 />
                        </AppLayout>
                    }
                />
                <Route
                    path='/businesses/edit/step-4'
                    element={
                        <AppLayout>
                            <EditBusinessStep4 />
                        </AppLayout>
                    }
                />
                <Route
                    path='/businesses/edit/step-4/location'
                    element={
                        <AppLayout>
                            <ShowBusinessLocation location={location} />
                        </AppLayout>
                    }
                />
            </Route>

            <Route path="/introduction" element={<Intro />} />

            <Route path="/terms-conditions" element={<Terms />} />

            <Route path="/privacy" element={<Terms />} />
        </Routes>
    );
}

export default AppRoutes;
