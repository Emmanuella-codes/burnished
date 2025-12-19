import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export function HoverCardCmp() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">Read Me</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <h3 className="text-sm font-medium">
            To keep things fair, you can make 2 requests per day across all features.
            Your limit automatically resets at midnight (12:00 AM).
          </h3>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
