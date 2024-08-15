'use server';

import { ID } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, messaging } from "../appwrite.config";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { formatDateTime } from "../utils";

export const createAppointment = async(appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
        );

        revalidatePath("/admin");
        return parseStringify(newAppointment);
    } catch (error) {
        console.error("An error occurred while creating a new appointment:", error);
    }
};

export const sendSMSNotification = async (userId: string, content: string) => {
    try {
        const message = await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId]
        );

        return parseStringify(message);
    } catch (error) {
        console.error("An error occurred while sending SMS notification:", error);
    }
}

export const updateAppointment = async({ appointmentId, userId , appointment, type }: UpdateAppointmentParams) =>{
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        );

        if(!updateAppointment) throw new Error("Appointment not found");

        // const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`
        // await sendSMSNotification(userId, smsMessage);

        revalidatePath("/admin");
        return parseStringify(updatedAppointment);

    } catch (error) {
        console.error("An error occurred while updating appointment:", error);
    }
}

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        );

        return parseStringify(appointment);
    } catch (error) {
        console.error("An error occurred while retrieving appointment:", error);
    }
}
