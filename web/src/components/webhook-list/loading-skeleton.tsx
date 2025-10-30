import { Skeleton } from '../ui/skeleton'

export function LoadingSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-lg">
            <div className="flex items-start gap-3 px-4 py-2.5">
              <Skeleton className="size-4 mt-1" />

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex gap-3">
                  <Skeleton className="h-4 w-12" />

                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>

              <Skeleton className="size-6 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
