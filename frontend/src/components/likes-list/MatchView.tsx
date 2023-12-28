import VisibilityIcon from '@mui/icons-material/Visibility';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { FeedCard } from 'components/Dates/FeedCard';
import { useState } from 'react';
import { IFeedUser } from 'shared/types';

type MatchViewProps = {
  match: IFeedUser;
};

export function MatchView({ match }: MatchViewProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <VisibilityIcon />
      </IconButton>
      <Dialog onClose={() => setOpen(false)} open={open} maxWidth={false}>
        <DialogTitle>Анкета</DialogTitle>
        <DialogContent>
          <FeedCard key={match.id} user={match} isMatch={true} />
        </DialogContent>
      </Dialog>
    </>
  );
}
