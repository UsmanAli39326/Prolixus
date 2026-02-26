"use client";
import React from "react";
import { FaTrash, FaSave } from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function ProfileActions({ isLoading }) {
    return (
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 pt-4">
            <Button
                variant="ghost"
                type="button"
                className="text-error hover:bg-error/5 hover:text-error dark:hover:bg-error/10 w-full md:w-auto"
                leftIcon={<FaTrash />}
            >
                Delete Account
            </Button>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <Button variant="outline" type="button">
                    Cancel Changes
                </Button>

                <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    loading={isLoading}
                    leftIcon={<FaSave />}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}