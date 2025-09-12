import { useState } from "react";
import { MdKeyboardArrowDown as DropdownIcon } from "react-icons/md";
import { PiListLight as ListIcon, PiGridFour as GridIcon } from "react-icons/pi";
import { Loader2 as LoadingIcon } from "lucide-react";
import BasesList from "./BasesList";
import BasesGrid from "./BasesGrid";
import { toastNotBuilt } from "~/hooks/helpers";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
const OpenedInDropdown = () => {
  return (
    <button className="flex flex-row items-center gap-1 group text-gray-600 cursor-pointer"
      onClick={toastNotBuilt}
    >
      <p className="text-[15px] group-hover:text-[rgb(29,31,37)]">Opened anytime</p>
      <DropdownIcon className="text-[16px] group-hover:text-[rgb(29,31,37)]"/>
    </button>
  )
}

interface ViewModeInfo {
  Icon: React.ElementType,
  helperText: string
}
const enum viewModes {
  LIST = 0,
  GRID = 1
}
const ViewModes = ({ mode, setMode } : { mode: viewModes, setMode: (mode: viewModes) => void }) => {
  const modes: ViewModeInfo[] = [
    {
      Icon: ListIcon as React.ElementType,
      helperText: "View items in a list"
    },
    {
      Icon: GridIcon as React.ElementType,
      helperText: "View items in a grid"
    }
  ]
  const [listHovered, setListHovered] = useState<boolean>(false)
  const [gridHovered, setGridHovered] = useState<boolean>(false)
  return (
    <div className="flex flex-row items-center">
      {
        modes.map((modeInfo, index) => {
          const {Icon} = modeInfo
          const mappedMode = index === 0 ? viewModes.LIST : viewModes.GRID
          const selected = mode === mappedMode
          const hovered = index === 0 ? listHovered : gridHovered
          const setHoveredFunc = index === 0 ? setListHovered : setGridHovered
          return (
            <button key={index} className="p-1 rounded-full cursor-pointer"
              style={{
                backgroundColor: selected ? 'rgba(0, 0, 0, 0.05)' : undefined
              }}
              onClick={() => setMode(index)}
              onMouseEnter={() => setHoveredFunc(true)}
              onMouseLeave={() => setHoveredFunc(false)}
            >
              <Icon className="w-5 h-5"
                style={{
                  color: selected || hovered ? "black" : "#55565b"
                }}
              />
            </button>
          )
        })
      }
    </div>
  )
}

const DisplayModes = ({ viewMode, setViewMode } : { viewMode: viewModes, setViewMode: (mode: viewModes) => void }) => {
  return (
    <div className="flex flex-row justify-between items-center pb-[20px]">
      <OpenedInDropdown/>
      <ViewModes mode={viewMode} setMode={setViewMode}/>
    </div>
  )
}


const NoBasesEl = ({ loggedIn, loading } : { loggedIn: boolean, loading: boolean }) => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      {
        !loggedIn
        ?
          <span className="text-[21px]">Please log in to view bases!</span>
        :
          loading
          ?
            <div className="flex flex-row items-center gap-x-4">
              <span className="text-[21px]">Loading all bases...</span>
              <LoadingIcon className="w-8 h-8 animate-spin"/>
            </div>
          :
            <div className="flex flex-col items-center">
              <span className="text-[21px] mb-2">You haven&apos;t opened anything recently</span>
              <span className="text-[13px] mb-6 text-gray-600">Apps that you have recently opened will appear here.</span>
              <button className="px-3 h-[32px] rounded-[6px] bg-white border cursor-pointer"
                style={{
                  borderColor: "#d9dadb",
                  boxShadow: "0px 1px 3px rgba(0,0,0,0.1)"
                }}
                onClick={toastNotBuilt}
              >
                <span className="text-[13px] text-gray-800">Go to all workspaces</span>
              </button>
            </div>
      }
    </div>
  )
}
export interface BaseInfo {
  id: string,
  name: string,
}

const Bases = () => {
  const [viewMode, setViewMode] = useState<viewModes>(viewModes.GRID)
  const { data: session } = useSession()
  const { data: basesData, isLoading } = api.base.getAll.useQuery(undefined, {
    enabled: !!session?.user
  })
  const bases = basesData
    ?
      basesData.map((baseData) => ({
        id: baseData.id,
        name: baseData.name
      }))
    :
      []
  return (
    <div className="flex flex-col w-full h-full">
      <DisplayModes viewMode={viewMode} setViewMode={setViewMode}/>
      {
        (!session?.user || isLoading || (bases && bases.length === 0))
        ?
          <NoBasesEl loggedIn={session?.user !== undefined} loading={isLoading}/>
        :
          viewMode === viewModes.LIST ? <BasesList bases={bases}/> : <BasesGrid bases={bases}/>
      }
    </div>
  )
}
export default Bases