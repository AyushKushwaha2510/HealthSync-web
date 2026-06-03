"use client";

import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { RegisterUserDto } from "../types/register.dto";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RegisterForm() {
    const { register, loading, success, error } = useRegister();

    const [form, setForm] = useState<RegisterUserDto>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dob: "",
        bloodGroup: "",
        gender: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        await register(form);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        Create Account
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    {/* First Name */}
                    <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input
                            name="firstName"
                            placeholder="Enter first name"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input
                            name="lastName"
                            placeholder="Enter last name"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label>Password</Label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                        />
                    </div>

                    {/* DOB */}
                    <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input
                            name="dob"
                            type="date"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Blood Group */}
                    <div className="space-y-2">
                        <Label>Blood Group</Label>
                        <Input
                            name="bloodGroup"
                            placeholder="e.g. O+, A-"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Gender */}
                    {/* Gender */}
                    <div className="space-y-2">
                        <Label>Gender</Label>

                        <Select
                            onValueChange={(value) =>
                                setForm((prev) => ({
                                    ...prev,
                                    gender: value as RegisterUserDto["gender"],
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </Button>

                    {success && <p>{success}</p>}
                    {error && (
                        <div>
                            {Array.isArray(error) ? (
                                error.map((e, i) => <p key={i}>{e}</p>)
                            ) : (
                                <p>{error}</p>
                            )}
                        </div>
                    )}

                </CardContent>
            </Card>
        </div >
    );
}