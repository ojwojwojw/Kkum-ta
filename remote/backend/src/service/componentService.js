class ComponentService {
  constructor(componentRepository) {
    this.componentRepository = componentRepository;
  }

  async updateInitTime(uid, gkey, time) {
    const grp = await this.componentRepository.findAllComponentByGroupKeyOfUser(gkey, uid);
    if(!grp) return false;

    const ckey = grp[0].component_key;

    this.componentRepository.updateInitTime(ckey, time);
  }

  async updateMaxIter(uid, gkey, iter) {
    const grp = await this.componentRepository.findAllComponentByGroupKeyOfUser(gkey, uid);
    if(!grp) return false;

    const ckey = grp[0].component_key;

    this.componentRepository.updateMaxIter(ckey, iter);
  }
}

module.exports = ComponentService;