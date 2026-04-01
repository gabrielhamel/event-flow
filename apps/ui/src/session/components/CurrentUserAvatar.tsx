import { Logout } from "@mui/icons-material";
import { Avatar, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { type MouseEvent, useState } from "react";

export const CurrentUserAvatar = (
  { avatarUrl, onSignOut, username }: { username: string; avatarUrl?: string; onSignOut: () => void },
) => {
  const [anchorAvatarMenu, setAnchorAvatarMenu] = useState<null | HTMLElement>(null);

  const avatarData = username.split(" ").map(word => word[0]).join("");

  const handleSignOut = () => {
    setAnchorAvatarMenu(null);

    onSignOut();
  };

  const handleAvatarClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorAvatarMenu(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorAvatarMenu(null);
  };

  return (
    <>
      <Avatar
        component="div"
        sx={{
          boxShadow: 1,
        }}
        src={avatarUrl}
        onClick={handleAvatarClick}
      >
        {avatarData}
      </Avatar>
      <Menu open={Boolean(anchorAvatarMenu)} onClose={handleAvatarMenuClose} anchorEl={anchorAvatarMenu}>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
};
