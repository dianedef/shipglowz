---
artifact: manual_test_checklist
metadata_schema_version: "1.0"
artifact_version: "0.1.0"
project: "ShipGlowz"
created: "2026-07-13"
created_at: "2026-07-13 17:41:30 UTC"
updated: "2026-07-13"
updated_at: "2026-07-13 17:41:30 UTC"
status: draft
source_skill: "102-sg-start"
scope: "local-ssh-authentication"
owner: "Diane"
target_scope: "password-to-ssh-key-promotion"
stack_profile: "bash-openssh"
proof_profile: "automated -> contract -> manual-server"
confidence: high
risk_level: high
security_impact: yes
docs_impact: yes
evidence: ["Automated helper and rollback tests live in tests/local/ssh-key-promotion.sh"]
depends_on:
  - artifact: "shipglowz_data/workflow/specs/password-to-ssh-key-promotion.md"
    artifact_version: "1.1.1"
    required_status: ready
supersedes: []
next_step: "/107-sg-test password-to-ssh-key-promotion"
---

# Manual Test Checklist: Password-To-SSH-Key Promotion

Use a redacted server label such as `new-server`; do not record a hostname, password, public-key record, private-key path, IP address, or raw SSH output.

| Scenario ID | Surface | Scenario | Required | Expected | Status | Observed | Evidence pointer | Notes | Bug Link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SSHKEY-M01 | local SSH menu | Add the new server with password auth, accept promotion, and generate or select a per-device key | yes | Public key installs, independent key-only proof passes, and saved mode becomes `key` | NOT_RUN | New server not supplied in this run | None | Record UTC time and redacted target label after execution | |
| SSHKEY-M02 | remote authorized keys | Run `Installer une clé SSH sur ce serveur` again with the same identity | yes | Operation reports the key as present and does not add a duplicate blob | NOT_RUN | New server not supplied in this run | None | Compare counts without copying key content into evidence | |
| SSHKEY-M03 | local SSH session | Close the password ControlMaster, restart `urls`, and start one app tunnel | yes | Tunnel starts without a server-password prompt | NOT_RUN | New server not supplied in this run | None | Do not record socket paths containing private host data | |
| SSHKEY-M04 | remote authorized keys | Confirm pre-existing authorized keys still authenticate after promotion | yes | Existing device access remains valid and file modes are restrictive | NOT_RUN | New server not supplied in this run | None | Record only pass/fail and modes, never key lines | |
| SSHKEY-M05 | second local device | Install a distinct public key from another device | yes | Both devices authenticate independently; no private key is copied | NOT_RUN | Second device/new server not supplied in this run | None | Revoke testing belongs to a separate scope | |
