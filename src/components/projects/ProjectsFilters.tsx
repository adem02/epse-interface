import { FilterIcon, GridIcon, ListIcon } from "../ui/icons";

type ProjectSortOption = "lastSync" | "name" | "type";

export function ProjectsFilters({
  view,
  setView,
  search,
  setSearch,
  sort,
  setSort,
}: {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  search: string;
  setSearch: (search: string) => void;
  sort: ProjectSortOption;
  setSort: (sort: ProjectSortOption) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="relative flex-1 max-w-sm">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "#64748b" }}
        >
          <FilterIcon />
        </span>
        <input
          type="text"
          placeholder="Filter by project name or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-3 py-2 font-mono outline-none transition-all"
          style={{
            backgroundColor: "#0f141a",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
            color: "#94a3b8",
            fontSize: "11px",
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.3)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.06)")}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono" style={{ fontSize: "10px", color: "#64748b" }}>
          SORT:
        </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as ProjectSortOption)}
          className="font-mono outline-none px-2 py-1.5 cursor-pointer"
          style={{
            backgroundColor: "#0f141a",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
            color: "#94a3b8",
            fontSize: "10px",
          }}
        >
          <option value="lastSync">Last Synchronized</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>

        {/* View toggle */}
        <div
          className="flex"
          style={{
            backgroundColor: "#0f141a",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "4px",
          }}
        >
          {([["grid", <GridIcon />], ["list", <ListIcon />]] as const).map(([v, icon]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="p-2 transition-all cursor-pointer"
              style={{
                color: view === v ? "#00E5FF" : "#64748b",
                backgroundColor: view === v ? "rgba(0,229,255,0.08)" : "transparent",
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}