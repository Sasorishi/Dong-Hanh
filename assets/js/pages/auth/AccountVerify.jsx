import React, { useState } from "react";
import { Flex, Input, Typography } from 'antd';
import axios from "axios";

const AccountVerify = () => {
    const [userId, setUserId] = useState(null);
    const [code, setCode] = useState(null);
    const [expiredAt, setExpiredAt] = useState(null);
    const [error, setError] = useState(null);

    var id = window.location.href.split('/');
    id = id[id.length - 1];

    const verifyCode = async (text, code, expiredAt) => {
        if (text == code) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            var day = date.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            var hours = date.getHours();
            if (hours < 10) {
                hours = "0" + hours;
            }
            var minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var seconds = date.getSeconds();
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + ".000000";
            console.log(
                expiredAt.date, currentDate
            )
            if (expiredAt.date >= currentDate) {
                await axios.post(`/api/auth/account-verify/database/${id}`);
                window.location.href = "/response/success/signup";
            } else {
                console.log(0);
            }
        } else {
            console.log(0);
        }
    }

    const handleAccountVerify = async () => {
        const response = await axios.post(`/api/auth/account-verify/${id}`);
        if (response.data.success !== false) {
            setUserId(response.data.userId);
            setCode(response.data.code);
            setExpiredAt(response.data.expiredAt);
        } else {
            setError(`Error : ${response.data.message}.`);
        }
    }

    const handleResendEmail = async () => {
        const response = await axios.post(`/api/auth/account-verify/resend/${id}`);
        console.log(response)
        if (response.data.success !== false) {
            setUserId(response.data.userId);
            setCode(response.data.code);
            setExpiredAt(response.data.expiredAt);
        } else {
            setError(`Error : ${response.data.message}.`);
        }
    }

    const onChange = (text) => {
        handleAccountVerify();
        verifyCode(text, code, expiredAt)
    };

    const sharedProps = {
        onChange,
    };

    return (
        <section>
            <div className="w-full max-w-sm p-6 m-auto mx-auto bg-whitesmoke rounded-lg shadow-md">
                <div className="flex flex-col text-center justify-center mx-auto">
                    <span className="mt-3">Verify your account</span>
                </div>
                <form className="mt-6">
                    <p className='text-center mb-6'>Enter the code you have <br /> received by email</p>
                    <div>
                        <Input.OTP length={6} {...sharedProps} />
                    </div>
                    <p className='text-center mt-6'>If you have not received it, <br /> click on the link below</p>
                    <p className='text-center mt-4'><a onClick={() => handleResendEmail()} style={{ cursor: "pointer" }}>Resend me an email</a></p>
                </form>
            </div>
        </section>
    )
}

export default AccountVerify