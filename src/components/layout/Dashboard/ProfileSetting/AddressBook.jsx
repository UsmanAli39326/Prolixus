"use client";
import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

export default function AddressBook() {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: "Home",
            street: "123 Organic Lane",
            city: "Eco City",
            zip: "12345",
            country: "Greenland",
            isDefault: true,
        },
    ]);
    const [editAddress, setEditAddress] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemove = (id) => {
        setAddresses(addresses.filter((addr) => addr.id !== id));
    };

    const handleEdit = (address) => {
        setEditAddress(address);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditAddress({
            id: Date.now(),
            type: "",
            street: "",
            city: "",
            zip: "",
            country: "",
            isDefault: false,
        });
        setIsModalOpen(true);
    };

    const handleSaveEdit = (updatedAddress) => {
        if (addresses.find(addr => addr.id === updatedAddress.id)) {
            setAddresses(addresses.map((addr) =>
                addr.id === updatedAddress.id ? updatedAddress : addr
            ));
        } else {
            setAddresses([...addresses, updatedAddress]);
        }
        setIsModalOpen(false);
        setEditAddress(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditAddress(null);
    };

    const EditAddressForm = ({ address, onSave, onCancel }) => {
        const [formData, setFormData] = useState(address);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(formData);
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                />
                <Input
                    label="Street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                    />
                    <Input
                        label="ZIP Code"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                    />
                </div>
                <Input
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    inputClassName="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-0 focus:border-primary"
                />
                <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-divider">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Save Address
                    </Button>
                </div>
            </form>
        );
    };

    return (
        <section className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-accent font-bold text-primary mb-2">
                        Address Book
                    </h3>
                    <p className="text-base text-text/70">
                        Manage your shipping and billing addresses.
                    </p>
                </div>
                <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<FaPlus />}
                    className="border-primary text-primary hover:bg-primary/5"
                    onClick={handleAdd}
                >
                    Add New
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className="p-5 rounded-2xl border border-divider bg-white dark:bg-white/5 shadow-sm hover:shadow-md transition-shadow relative"
                    >
                        {address.isDefault && (
                            <span className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px] uppercase font-bold px-2 py-1 rounded-full">
                                Default
                            </span>
                        )}

                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 rounded-full bg-secondary text-primary">
                                <FaMapMarkerAlt className="text-lg" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-primary mb-1">
                                    {address.type}
                                </h4>
                                <p className="text-sm text-text/80 leading-relaxed">
                                    {address.street}<br />
                                    {address.city}, {address.zip}<br />
                                    {address.country}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-divider">
                            <Button
                                size="xs"
                                variant="ghost"
                                className="text-text/70 hover:text-primary"
                                leftIcon={<FaEdit />}
                                onClick={() => handleEdit(address)}
                            >
                                Edit
                            </Button>
                            <Button
                                size="xs"
                                variant="ghost"
                                className="text-error/70 hover:text-error hover:bg-error/5"
                                leftIcon={<FaTrash />}
                                onClick={() => handleRemove(address.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit/Add Address Modal */}
            {isModalOpen && editAddress && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title={addresses.find(addr => addr.id === editAddress.id) ? "Edit Address" : "Add New Address"}
                    className="bg-white dark:bg-background-dark text-text dark:text-slate-100 border border-divider shadow-xl rounded-2xl overflow-hidden"
                >
                    <EditAddressForm
                        address={editAddress}
                        onSave={handleSaveEdit}
                        onCancel={handleCloseModal}
                    />
                </Modal>
            )}
        </section>
    );
}
