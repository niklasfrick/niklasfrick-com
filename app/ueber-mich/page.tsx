import { UeberMichClient } from './ueber-mich-client'
import { WORK_EXPERIENCE } from '@/app/data'

export default function UeberMichPage() {
  return <UeberMichClient workExperience={WORK_EXPERIENCE} />
}
