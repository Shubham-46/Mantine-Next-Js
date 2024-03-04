
import { useState } from "react";
import { Button, Flex, Text } from "@mantine/core";

//Icons
import { SlUserFollow } from "react-icons/sl";
import { SlUserFollowing } from "react-icons/sl";
import { FaRegStar } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { TbWorldWww } from "react-icons/tb";

// Styles
const boxStyle = () => ({
    marginTop: '10px',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    border: '0.5px solid rgb(226, 226, 249)',
    borderRadius: '8px',
});

// UserCard component to render individual user cards
function UserCard({ user, onDelete }: { user: any; onDelete: (user: any) => void }) {

    const [followClicked, setFollowClicked] = useState(false);
    const [isHoveredEmail, setIsHoveredEmail] = useState(false);
    const [isHoveredPhone, setIsHoveredPhone] = useState(false);
    const [isHoveredSite, setIsHoveredSite] = useState(false);

    const handleEmailClick = () => {
        window.location.href = `mailto:${user.email}`;
    };

    const handlePhoneClick = () => {
        window.location.href = `tel:${user.phone}`;
    };

    return (
        <div style={boxStyle()}>
            <div style={{
                textAlign: 'center',
                fontWeight: 600,
                paddingTop: '10px',
                paddingBottom: '10px',
            }}>
                <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                    alt={`Avatar for ${user.name}`}
                    style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                />
                {!followClicked ? (
                    <Text style={{ fontWeight: 600, fontSize: '18px', marginTop: '8px' }}>
                        {user.name}
                    </Text>
                ) : (
                    <Text style={{ fontWeight: 600, fontSize: '18px', marginTop: '8px' }}>
                        {user.name}
                        <FaRegStar style={{ marginLeft: '5px' }} />
                    </Text>
                )}
            </div>
            <div style={{ marginBottom: '5px' }}>
                <Text c="#868e96"
                    onMouseEnter={() => setIsHoveredPhone(true)}
                    onMouseLeave={() => setIsHoveredPhone(false)}
                    onClick={handleEmailClick}
                    style={{ cursor: 'pointer', textDecoration: isHoveredPhone ? 'underline' : 'none' }}
                >
                    <MdAlternateEmail style={{ marginRight: '8px' }} />
                    {user.email}
                </Text>
            </div>
            <div style={{ marginBottom: '5px' }}>
                <Text c="#868e96"
                    onMouseEnter={() => setIsHoveredEmail(true)}
                    onMouseLeave={() => setIsHoveredEmail(false)}
                    onClick={handlePhoneClick}
                    style={{ cursor: 'pointer', textDecoration: isHoveredEmail ? 'underline' : 'none' }}
                >
                    <FiPhoneCall style={{ marginRight: '8px' }} />
                    {user.phone}
                </Text>
            </div>
            <div>
                <a
                    href={user.website.startsWith('http') ? user.website : `http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsHoveredSite(true)}
                    onMouseLeave={() => setIsHoveredSite(false)}
                    style={{
                        textDecoration: isHoveredSite ? 'underline' : 'none', // Apply underline if hovered is true
                        color: '#868e96'
                    }}
                >
                    <TbWorldWww style={{ marginRight: '8px' }} />
                    {user.website}
                </a>
            </div>
            <Flex gap={5} pt={10}>
                {!followClicked ? (
                    <Button fullWidth onClick={() => setFollowClicked(true)}>
                        <SlUserFollow style={{ marginRight: '5px' }} />
                        Follow
                    </Button>
                ) : (
                    <Button fullWidth onClick={() => setFollowClicked(false)} bg="#FFFFFF" c="black" style={{ border: '1px solid blue' }}>
                        <SlUserFollowing style={{ marginRight: '5px' }} />
                        UnFollow
                    </Button>
                )}
                <Button fullWidth
                    onClick={() => {
                        onDelete(user),
                            setFollowClicked(false)
                    }}
                    bg="#FFFFFF" c="blue" style={{ border: '1px solid blue' }}>
                    <RiDeleteBinLine style={{ marginRight: '8px' }} />
                    Delete
                </Button>
            </Flex>
        </div >
    );
}
export default UserCard;

