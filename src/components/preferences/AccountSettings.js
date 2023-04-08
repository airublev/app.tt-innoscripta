import React, { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, FormControlLabel, Grid, InputLabel, OutlinedInput, Typography } from "@mui/material";

import UserService from '../../api/users';

const AccountSettings = () => {
    const [user, setUser] = useState({});
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userDetails = await UserService.getUserDetails();
            setUser(userDetails);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        try {
            await UserService.updateUserDetails(user);
            alert('Account settings updated successfully');
        } catch (error) {
            console.error('Error updating account settings:', error);
        }
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();

        if (newPassword !== newPasswordConfirmation) {
            alert('New password and confirmation do not match');
            return;
        }

        try {
            await UserService.changePassword(currentPassword, newPassword);
            alert('Password changed successfully');
            setCurrentPassword('');
            setNewPassword('');
            setNewPasswordConfirmation('');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <Container>
            <Box className="account-settings" sx={{ marginTop: "2rem" }}>
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                    Account Settings
                </Typography>
                <form onSubmit={handleUserUpdate}>
                    <FormControl fullWidth variant="outlined" sx={{ marginBottom: "1rem" }}>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <OutlinedInput
                            id="name"
                            value={user.name || ""}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            label="Name"
                        />
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Update Details
                    </Button>
                </form>

                <Typography variant="h5" sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
                    Change Password
                </Typography>
                <form onSubmit={handleChangePassword}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="current-password">Current Password</InputLabel>
                                <OutlinedInput
                                    id="current-password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    label="Current Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="new-password">New Password</InputLabel>
                                <OutlinedInput
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    label="New Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="new-password-confirmation">
                                    Confirm New Password
                                </InputLabel>
                                <OutlinedInput
                                    id="new-password-confirmation"
                                    type="password"
                                    value={newPasswordConfirmation}
                                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                                    label="Confirm New Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default AccountSettings;