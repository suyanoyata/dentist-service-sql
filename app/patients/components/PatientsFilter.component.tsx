import { Input } from "@/components/ui/input"
import { ComboBoxTraditional } from "./DiagnosisDropdown.component"
import { diganosis_list } from "@/constants/diagnosis"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import { api } from "@/lib/axios"
import { PatientsContext } from "@/context/PatientsTable.context"

export default function PatientsFilter() {
  const [diagnosis, setDiagnosis] = useState<string>()
  const [name, setName] = useState<string>("")

  const { setPatients } = useContext(PatientsContext)

  function submitFiltering() {
    let filter = "/patients/filter?"

    if (name != "") {
      filter = filter + `p.full_name=${name}&`
    }

    if (diagnosis != undefined) {
      filter = filter + `mr.diagnosis=${diagnosis}`
    }

    api.get(filter).then((response) => {
      setPatients(response.data.data)
    })
  }

  return (
    <div className="flex">
      <Input
        value={name}
        onChange={(event) => {
          setName(event.target.value)
        }}
        className="h-8 mr-2"
        placeholder="Ім'я пацієнта"
      />
      <ComboBoxTraditional
        value={diagnosis}
        setValue={setDiagnosis}
        selectOptionLabel="Оберіть діагноз"
        options={diganosis_list}
      />
      <Button className="h-8 ml-2" onClick={submitFiltering}>
        Фільтрувати
      </Button>
    </div>
  )
}
