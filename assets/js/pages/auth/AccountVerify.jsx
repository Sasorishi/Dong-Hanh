import React from 'react';
import { Flex, Input, Typography } from 'antd';

const AccountVerify = () => {

    const onChange = (text) => {
        console.log(text);
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
                    <p className='text-center mt-4' ><a href="">Resend me an email</a></p>
                </form>
            </div>
        </section>
    )
}

export default AccountVerify