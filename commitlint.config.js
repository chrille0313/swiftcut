export default {
  extends: ["@commitlint/config-conventional"],
  // Dependabot hardcodes a capitalized "Bump <dep> from <x> to <y>" subject that
  // trips config-conventional's subject-case rule and cannot be changed via
  // dependabot.yml (only the prefix is configurable). Skip its auto-generated
  // commits so the required commitlint check passes; human commits stay enforced.
  ignores: [(message) => /^chore\(deps(?:-dev)?\): Bump /.test(message)],
};
