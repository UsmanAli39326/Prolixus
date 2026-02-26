import ContactSection from '@/components/layout/ContactUS/ContactSection'
import PageHeader from '@/components/layout/PageHeader'
import ContactForm from '@/components/layout/ContactUS/ContactForm'
import React from 'react'

async function page() {
    return (
        <>
            <PageHeader title="Contact" subtitle="us" />
            <ContactForm />

            {/* <ContactSection /> */}
        </>
    )
}

export default page