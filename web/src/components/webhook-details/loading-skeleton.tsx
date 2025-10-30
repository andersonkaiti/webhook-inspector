import { Skeleton } from '../ui/skeleton'

export function LoadingSkeleton() {
  return (
    <div className="flex h-full w-full flex-col">
      <header className="space-y-4 border-b border-zinc-700 p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-64 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-32" />
          </div>
          <span className="w-px h-4 bg-zinc-700" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <div className="space-y-4">
            <Skeleton className="h-5 w-48 rounded-md" />
            <div className="overflow-hidden rounded-lg border border-zinc-700">
              <table className="w-full">
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-700 last:border-0"
                    >
                      <td className="p-3 bg-zinc-800/50 border-r border-zinc-700">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-48" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-48 rounded-md" />
            <div className="overflow-hidden rounded-lg border border-zinc-700">
              <table className="w-full">
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-700 last:border-0"
                    >
                      <td className="p-3 bg-zinc-800/50 border-r border-zinc-700">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-48" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-48 rounded-md" />
            <div className="overflow-hidden rounded-lg border border-zinc-700">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-3 text-center text-sm text-zinc-400">
                      No query parameters
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-48 rounded-md" />
            <div className="rounded-lg border border-zinc-700 p-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
