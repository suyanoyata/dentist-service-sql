"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format_date";
import { EditableCell } from "../old-app-components/EditableCell";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text } from "./typography";
import CreateNewPatientRecord from "@/app/patients/components/CreateNewPatientRecord.alert";

type Patient = {
  patient_id: number;
  full_name: string;
  date_of_birth: Date;
  diagnosis: string;
};

export default function PatientsTable() {
  const [patients, setPatients] = useState<Patient[]>();

  useEffect(() => {
    axios.get("http://localhost:3001/patients").then((response) => {
      setPatients(response.data.data);
    });
  }, []);

  const Patient = ({ patient }: { patient: Patient }) => {
    return (
      <TableRow>
        <TableCell className="font-medium">{patient.patient_id}</TableCell>
        <EditableCell overall={patient}>{patient.full_name}</EditableCell>
        <TableCell className="font-medium">{patient.diagnosis}</TableCell>
        <TableCell className="text-right">
          {formatDate(patient.date_of_birth)}
        </TableCell>
      </TableRow>
    );
  };

  // suggestion -- use check for patients to display additional text?

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead className="w-[200px]">Імʼя</TableHead>
          <TableHead>Діагноз</TableHead>
          <TableHead className="text-right">Дата народження</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients &&
          patients.map((patient: Patient) => (
            <Patient key={patient.patient_id} patient={patient} />
          ))}
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead className="text-right">
            <CreateNewPatientRecord />
          </TableHead>
        </TableRow>
      </TableBody>
    </Table>
  );
}
