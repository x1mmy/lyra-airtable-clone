import * as Popover from "@radix-ui/react-popover";
import { MdKeyboardArrowDown as DropdownIcon } from "react-icons/md";
import { Loader2 as LoadingIcon } from "lucide-react";
import { GoPlus as AddTableIcon } from "react-icons/go";
import { VscEdit as RenameIcon } from "react-icons/vsc";
import { HiOutlineTrash as DeleteIcon } from "react-icons/hi";
import { toastNotBuilt } from "~/hooks/helpers";
import type { TableData, TablesData } from "../BasePage";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const TableTabs = ({ baseId, tablesData, currentTable } : { baseId?: string, tablesData: TablesData, currentTable: TableData }) => {
  const router = useRouter()
  const utils = api.useUtils()
  const { mutate: addNewTable, status } = api.base.addNewTable.useMutation({
    onSuccess: async (createdTable) => {
      if (createdTable) {
        await utils.base.getAllFromBase.invalidate()
        console.log(createdTable)
        const newTableId = createdTable.id
        const defaultViewId = createdTable.lastOpenedViewId
        if (newTableId && defaultViewId) router.push(`/base/${baseId}/${newTableId}/${defaultViewId}`)
      }
    }
  })
  function createNewTable() {
    if (baseId && tablesData) {
      addNewTable({ newName: `Table ${tablesData.length + 1}`, baseId: baseId })
    }
  }
  const { mutate: deleteTable, status: deleteTableStatus } = api.base.deleteTable.useMutation({
    onSuccess: async (updatedBase) => {
      if (updatedBase) {
        await utils.base.getAllFromBase.invalidate()
        const fallbackTableId = updatedBase.lastOpenedTableId
        const fallbackTable = tablesData?.find((tableData) => tableData.id === fallbackTableId)
        const fallbackViewId = fallbackTable?.lastOpenedViewId
        if (fallbackTableId && fallbackViewId) router.push(`/base/${baseId}/${fallbackTableId}/${fallbackViewId}`)
      }
    }
  })
  function onDeleteTable(tableData: TableData, isFirstTable=false) {
    if (!tablesData) return
    if (tablesData.length <= 1) {
      toast("Cannot delete only table!")
      return
    }
    if (baseId && tableData && tablesData.length > 1 && tablesData[0] && tablesData[1]) {
      deleteTable({baseId, tableId: tableData.id, fallbackTableId: isFirstTable ? tablesData[1].id : tablesData[0].id })
    }
  }
  function onClickTableTab(tableData: TableData) {
    if (tableData) router.push(`/base/${baseId}/${tableData.id}/${tableData.lastOpenedViewId}`)
  }
  return (
    <div className="h-8 bg-[#fff1ff] text-[13px] border-b-[1px] border-box flex flex-row justify-between items-center"
      style={{
        borderColor: "hsl(202, 10%, 88%)"
      }}
    >
      <div className="h-full overflow-y-hidden overflow-x-hidden">
        {
          tablesData
          ?
            <div className="flex flex-row items-center h-full text-gray-600 flex-shrink-0">
              <div className="flex flex-row items-center h-full max-w-[500px] truncate">
                {
                  tablesData.map((tableData, index) => {
                    const tableName = tableData.name
                    const isCurrentTable = currentTable?.id === tableData.id
                    return (
                      isCurrentTable
                      ?
                        <Popover.Root key={index}>
                          <Popover.Trigger asChild>
                            <button className="flex-shrink-0 h-[calc(100%+1px)] px-3 font-[500] text-black bg-white border-box border-t-[1px] border-r-[1px] rounded-[6px] cursor-pointer"
                              style={{
                                borderColor: "hsl(202, 10%, 88%)",
                                borderLeftWidth: index === 0 ? 0 : "1px",
                                borderTopLeftRadius: index === 0 ? 0 : "6px",
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                              }}
                            >
                              <div className="flex flex-row items-center gap-1">
                                <span>{tableName}</span>
                                <DropdownIcon className="text-[16px] text-gray-600"/>
                              </div>
                            </button>
                          </Popover.Trigger>
                          <Popover.Portal>
                            <Popover.Content
                              side="bottom"
                              align="start"
                              className="bg-white rounded-[6px] p-4 z-50 w-[180px] relative top-2 left-0"
                              style={{
                                boxShadow: "0 4px 16px 0 rgba(0, 0, 0, .25)"
                              }}
                            >
                              <div className="flex flex-col w-full text-gray-700 text-[13px]">
                                <button className="flex flex-row items-center h-8 p-2 gap-2 hover:bg-[#f2f2f2] rounded-[6px] cursor-pointer"
                                  onClick={() => toastNotBuilt("Table rename")}
                                >
                                  <RenameIcon className="w-[14px] h-[14px]"/>
                                  <span>Rename table</span>
                                </button>
                                <button className="flex flex-row items-center h-8 p-2 gap-2 hover:bg-[#f2f2f2] rounded-[6px] cursor-pointer"
                                  onClick={() => onDeleteTable(tableData, index === 0)}
                                >
                                  <DeleteIcon className="w-[14px] h-[14px]"/>
                                  <span>Delete table</span>
                                </button>
                              </div>
                            </Popover.Content>
                          </Popover.Portal>
                        </Popover.Root>
                      :
                        <div key={index} className="flex-shrink-0 h-full flex flex-row items-center hover:bg-[#ebdeeb]">
                          <button  className="h-full px-3 text-gray-600 cursor-pointer hover:text-black"
                            onClick={() => onClickTableTab(tableData)}
                          >
                            <span>{tableName}</span>
                          </button>
                          <div className="h-[12px] w-[1px] bg-gray-300 relative left-[1px]"/> 
                        </div>
                    )
                  })
                }
              </div>
              <div className="flex flex-row items-center flex-shrink-0">
                <button className="mx-3 cursor-pointer" onClick={toastNotBuilt}>
                  <DropdownIcon className="text-[16px]"/>
                </button>
                <button className="flex flex-row group items-center gap-2 px-3 cursor-pointer"
                  onClick={createNewTable}
                >
                  <AddTableIcon className="w-5 h-5 group-hover:text-black"/>
                  <span className="mt-[1px] group-hover:text-black">Add new table</span>
                </button>
              </div>
            </div>
          :
          <div className="flex flex-row items-center h-full flex-shrink-0">
            <LoadingIcon className="w-4 h-4 animate-spin ml-3"/>
          </div>
        }
      </div>
      <button className="flex flex-row group items-center cursor-pointer gap-1 px-3 text-gray-600" onClick={toastNotBuilt}>
        <span className="text-[13px] group-hover:text-[rgb(29,31,37)]">Tools</span>
        <DropdownIcon className="text-[16px] group-hover:text-[rgb(29,31,37)]"/>
      </button>
    </div>
  )
}
export default TableTabs