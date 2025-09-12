import { HomeIcon, StarIcon } from "@heroicons/react/24/outline"
import { PiShare as SharedIcon } from "react-icons/pi";
import { HiOutlineUserGroup as WorkspacesIcon } from "react-icons/hi2";
export interface SidebarButtonInfo {
  icon: React.ElementType,
  buttonText: string,
  dim?: number | string
}
const CreatedBasesSection = () => {
  const buttons: SidebarButtonInfo[] = [
    {
      icon: HomeIcon,
      buttonText: "Home"
    },
    {
      icon: StarIcon,
      buttonText: "Starred"
    },
    {
      icon: SharedIcon as React.ElementType,
      buttonText: "Shared"
    },
    {
      icon: WorkspacesIcon as React.ElementType, // Type assertion needed because WorkspacesIcon from react-icons has a more specific type that doesn't match React.ElementType
      buttonText: "Workspaces"
    }
  ]
  return (
    <div className="flex flex-col">
      {
        buttons.map((SidebarButtonInfo, index) => {
          const Icon = SidebarButtonInfo.icon
          const dim = SidebarButtonInfo.dim ?? 5
          return (
            <Icon key={index} className={`w-${dim} h-${dim} flex-shrink-0 mb-5`}/>
          )
        })
      }
      <div className="w-[22px] h-[1px] bg-[#0000001A]"/>
    </div>
  )
}
export default CreatedBasesSection