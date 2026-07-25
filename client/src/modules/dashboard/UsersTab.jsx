import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';
import { Shield, ShieldAlert, CheckCircle2, XCircle, UserCheck } from 'lucide-react';

export const UsersTab = ({ users = [], onRoleChange, onStatusChange, currentUser }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-indigo-950">Team Governance & Role Control</h3>
          </div>
          <p className="text-xs text-indigo-700 font-medium">
            Admin access allows instant role elevation (ADMIN / MEMBER) and account activation toggle (ACTIVE / INACTIVE).
          </p>
        </div>
        <Badge variant="outline" className="font-mono font-bold bg-white text-indigo-700 border-indigo-300 text-xs">
          {users.length} Workspace Users
        </Badge>
      </div>

      <Card className="overflow-hidden border-slate-200 bg-white shadow-2xs">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80 border-b border-slate-200">
              <TableHead className="text-slate-700 font-bold text-xs">User Profile</TableHead>
              <TableHead className="text-slate-700 font-bold text-xs">Email</TableHead>
              <TableHead className="text-slate-700 font-bold text-xs">Current Role</TableHead>
              <TableHead className="text-slate-700 font-bold text-xs">Status</TableHead>
              <TableHead className="text-right text-slate-700 font-bold text-xs">Actions (Admin Only)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => {
              const uId = u._id || u.id;
              const isSelf = currentUser?._id === uId || currentUser?.id === uId;
              const initials = u.name
                ? u.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
                : 'U';

              return (
                <TableRow key={uId} className="hover:bg-slate-50 border-b border-slate-100">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          {u.name}
                          {isSelf && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-1.5 py-0.5 rounded border border-slate-200">You</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">Joined: {new Date(u.createdAt || Date.now()).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs font-medium text-slate-800">
                    {u.email}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={`font-bold text-xs ${u.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {u.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {u.status === 'ACTIVE' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-emerald-700">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span className="text-xs font-bold text-rose-700">Inactive</span>
                        </>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isSelf}
                      onClick={() => onRoleChange(uId, u.role === 'ADMIN' ? 'MEMBER' : 'ADMIN')}
                      className="text-xs font-bold border-slate-200 hover:bg-slate-100"
                    >
                      Set as {u.role === 'ADMIN' ? 'Member' : 'Admin'}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isSelf}
                      onClick={() => onStatusChange(uId, u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
                      className={`text-xs font-bold ${u.status === 'ACTIVE' ? 'text-rose-600 hover:bg-rose-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                    >
                      {u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
